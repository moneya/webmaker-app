var Make = require('../../lib/make');
var templates = require('../../lib/templates.json');
var view = require('../../lib/view');

module.exports = view.extend({
    id: 'add',
    template: require('./index.html'),
    created: function () {
        var self = this;

        // Fetch app
        var id = self.$parent.$data.params.id;
        var target = new Make(id).meta;

        // Bind app
        self.$data = target;
        self.title = target.name;
    },
    ready: function () {
        var self = this;

        // Click handler
        function clickHandler (e) {
            e.preventDefault();

            // Attributes
            var block = e.currentTarget.getAttribute('data-block');
            var href = e.currentTarget.getAttribute('href');

            // Add block to make
            var id = self.$parent.$data.params.id;
            var target = new Make(id);
            target.insert(block);

            // Add to model & redirect to editor
            self.page(href);
        }

        // Apply click handler to each cell
        var targets = self.$el.getElementsByTagName('a');
        for (var i = 0; i < targets.length; i++) {
            targets[i].addEventListener('click', clickHandler);
        }
    }
});