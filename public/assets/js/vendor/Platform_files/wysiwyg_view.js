Platform.module("PubsApp.Edit.Wysiwyg", function(Wysiwyg, Platform, Backbone, Marionette, $, _){
//this is the view for editing publication content//

Wysiwyg.Pub = Marionette.ItemView.extend({
	template: "#pub-edit-wysiwyg",

	events: {
		"click button.js-submit": "submitClicked"
	},

	submitClicked: function(e){
		e.preventDefault();
		//serialize the form data//
		var content = this.$('#summernote').summernote('code');
		console.log("on save content: " + content);
		this.trigger("form:submit", content);
	},

	onShow: function(){
		var content = this.model.get("contentWysiwyg");
		console.log("on load content: " + content);
  		this.$('#summernote').summernote({
		  height: 300,                 // set editor height
		  minHeight: null,             // set minimum height of editor
		  maxHeight: null,             // set maximum height of editor
		  focus: true                  // set focus to editable area after initializing summernote
		});
  		this.$('#summernote').summernote('code', content);
	}
});
});