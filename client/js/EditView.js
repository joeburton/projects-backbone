define([
    'jquery', 
    'underscore', 
    'backbone',
    'bootstrap',
    'text!templates/project.html'
], function($, _, Backbone, bootstrap, projectTmpl) {
    
	var EditView = Backbone.View.extend({

		el: '#edit-project',

		events: {
			'click .btn-danger.delete': 'deleteProject',
			'click .btn-primary.save': 'updateProject'
		},

		initialize: function () {

	    	this.$el.find('[data-project-name]').val(this.model.get('project'));
	    	this.$el.find('[data-company-name]').val(this.model.get('company'));
	    	this.$el.find('[data-skills]').val(this.model.get('skills'));
	    	this.$el.find('[data-description]').val(this.model.get('description'));
			
			var that = this;

			$('#edit-project').on('hidden.bs.modal', function () {
				that.close();
			});

		},

	    deleteProject: function () {

	    	var that = this;

	        this.model.destroy({
	            success: function () {
	                console.log('Project deleted successfully');
	                that.close();
	            },
	            error: function () {
	                alert('Sorry something went wrong.');
	            }
	        });
	        
	    },

	    updateProject: function () {
	    	
	    	var project = this.$el.find('[data-project-name]').val();
	    	var company = this.$el.find('[data-company-name]').val();
	    	var skills = this.$el.find('[data-skills]').val();
	    	var description = this.$el.find('[data-description]').val();
	    	var that = this;

	    	this.model.save({
	    		'project': project,
	    		'company': company,
	    		'skills': skills,
	    		'description': description
	    		},{
	    		success: function () {
					console.log('Project updated successfully');
                	that.close();
	    		},
	    		error: function () {
	    			alert('Sorry something went wrong.');
	    		}
	    	});

	    },

	    close: function () {

	    	console.log('Close: Edit project');

			this.undelegateEvents();
	    	$('#edit-project').modal('hide');
	    	$('#edit-project').off();

	    	app.navigate('/', true);  

	    }
	    
	});

	return EditView;
    
});
