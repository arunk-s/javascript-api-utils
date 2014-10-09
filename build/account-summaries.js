!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.gaApiUtils||(f.gaApiUtils={})).accountSummaries=e()}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function AccountSummaries(summaries){this.summaries_=summaries;this.setup_()}AccountSummaries.prototype.setup_=function(){this.accountsById_={};this.webPropertiesById_=this.propertiesById_={};this.profilesById_=this.viewsById_={};for(var i=0,account;account=this.summaries_[i];i++){this.accountsById_[account.id]={self:account};if(!account.webProperties)continue;alias(account,"webProperties","properties");for(var j=0,webProperty;webProperty=account.webProperties[j];j++){this.webPropertiesById_[webProperty.id]={self:webProperty,parent:account};if(!webProperty.profiles)continue;alias(webProperty,"profiles","views");for(var k=0,profile;profile=webProperty.profiles[k];k++){this.profilesById_[profile.id]={self:profile,parent:webProperty,grandParent:account}}}}};AccountSummaries.prototype.all=function(){return this.summaries_};AccountSummaries.prototype.get=function(obj){if(!!obj.accountId+!!obj.webPropertyId+!!obj.propertyId+!!obj.profileId+!!obj.viewId>1){throw new Error("get() only accepts an object with a single "+'property: either "accountId", "webPropertyId", "propertyId", '+'"profileId" or "viewId"')}return this.getProfile(obj.profileId||obj.viewId)||this.getWebProperty(obj.webPropertyId||obj.propertyId)||this.getAccount(obj.accountId)};AccountSummaries.prototype.getAccount=function(accountId){return this.accountsById_[accountId]&&this.accountsById_[accountId].self};AccountSummaries.prototype.getWebProperty=function(webPropertyId){return this.webPropertiesById_[webPropertyId]&&this.webPropertiesById_[webPropertyId].self};AccountSummaries.prototype.getProfile=function(profileId){return this.profilesById_[profileId]&&this.profilesById_[profileId].self};AccountSummaries.prototype.getAccountByProfileId=function(profileId){return this.profilesById_[profileId]&&this.profilesById_[profileId].grandParent};AccountSummaries.prototype.getWebPropertyByProfileId=function(profileId){return this.profilesById_[profileId]&&this.profilesById_[profileId].parent};AccountSummaries.prototype.getAccountByWebPropertyId=function(webPropertyId){return this.webPropertiesById_[webPropertyId]&&this.webPropertiesById_[webPropertyId].parent};alias(AccountSummaries.prototype,"getWebProperty","getProperty");alias(AccountSummaries.prototype,"getProfile","getView");alias(AccountSummaries.prototype,"getWebPropertyByProfileId","getPropertyByViewId");alias(AccountSummaries.prototype,"getAccountByProfileId","getAccountByViewId");alias(AccountSummaries.prototype,"getAccountByWebPropertyId","getAccountByPropertyId");function alias(object,referenceProp,aliasName){if(Object.defineProperty){Object.defineProperty(object,aliasName,{get:function(){return object[referenceProp]}})}else{object[aliasName]=object[referenceProp]}}module.exports=AccountSummaries},{}],2:[function(require,module,exports){var AccountSummaries=require("./account-summaries");var promise;function requestAccountSummaries(){return new Promise(function(resolve,reject){var summaries=[];function makeRequest(startIndex){gapi.client.analytics.management.accountSummaries.list({"start-index":startIndex||1}).execute(ensureComplete)}function ensureComplete(resp){if(resp.error)reject(new Error(resp.message));if(resp.items){summaries=summaries.concat(resp.items)}else{reject(new Error("You do not have any Google Analytics accounts. "+"Go to http://google.com/analytics to sign up."))}if(resp.startIndex+resp.itemsPerPage<=resp.totalResults){makeRequest(resp.startIndex+resp.itemsPerPage)}else{resolve(new AccountSummaries(summaries))}}makeRequest()})}module.exports={get:function(noCache){if(noCache)promise=null;return promise||(promise=requestAccountSummaries())}}},{"./account-summaries":1}]},{},[2])(2)});