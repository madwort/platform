import * as Users from './models/user'
import * as Pubs from './models/pub'
import * as Rhizomes from './models/rhizome'
import {gc} from '../../components/radio'

var Radio = Marionette.Object.extend({

  channelName: 'gc',

  //initialize: function() {
  //  gc.reply('pub:get', this.getPub);
  //},

  radioRequests: {
    'user:get': 'getUser',
    'users:get': 'getUsers',
    'pub:get': 'getPub',
    'pubs:get': 'getPubs',
    'rhizome:get': 'getRhizome',
    'rhizomes:get': 'getRhizomes',
  },

  getUser: function(id) {
    console.log('user:get request recieved')
    return Users.UserAPI.getUser(id)
  },

  getUsers: function() {
    console.log('users:get request recieved')
    return Users.UserAPI.getUsers()
  },

  getPub: function(id) {
    console.log('pub:get request recieved')
    return Pubs.PubAPI.getPub(id)
  },

  getPubs: function() {
    console.log('pubs:get request recieved')
    return Pubs.PubAPI.getPubs()
  },
  getRhizome: function(id) {
    console.log('rhizome:get request recieved')
    return Rhizomes.RhizomeAPI.getRhizome(id)
  },

  getRhizomes: function() {
    console.log('rhizomes:get request recieved')
    return Rhizomes.RhizomeAPI.getRhizomes()
  },
})

var Router = new Radio()

export {Users, Pubs, Rhizomes, Router}
