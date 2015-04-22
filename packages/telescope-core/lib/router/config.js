Router.setTemplateNameConverter(function (str) { return str; });

Telescope.config.preloadSubscriptions.push('settings');
Telescope.config.preloadSubscriptions.push('currentUser');

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return _.map(Telescope.config.preloadSubscriptions, function(sub){
      // can either pass strings or objects with subName and subArguments properties
      if (typeof sub === 'object'){
        Meteor.subscribe(sub.subName, sub.subArguments);
      }else{
        Meteor.subscribe(sub);
      }
    });
  }
});

// adding common subscriptions that's need to be loaded on all the routes
// notification does not included here since it is not much critical and
// it might have considerable amount of docs
if(Meteor.isServer) {
  FastRender.onAllRoutes(function() {
    var router = this;
    _.each(Telescope.config.preloadSubscriptions, function(sub){
      router.subscribe(sub);
    });
  });
}

Telescope.controllers = {};