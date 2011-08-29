/*
*  Dynamic
*  User Interface
*  Drawing
*  Engine
*/

var DUDE = {
    
    container: $("body"),
    post_data: {},
    
    init: function() {
        
    },
    
    render: function(container, structure) {
        
        DUDE.container = container;
        
        var validation_options = {
            
            submitHandler: function(form) {
                // activate sending post 
                
                debugger;

                container.find("input, select").each(function() {
			        DUDE.post_data[this.name] = this.value;
		        });
                
                alert(JSON.stringify(DUDE.post_data));
                container.append($.INPUT( { type: "hidden", value: JSON.stringify(DUDE.post_data) } ));
                
                form.submit();
            },
            rules: {}
        };
        
        
        container.append($.H1({}, structure.title));
        container.append($.P({}, structure.description));

        $.each(structure.fields, function(i, f) {
            
            eval("validation_options.rules." + f.name + " = f.rules");

            switch(f.type) {
            case "string": 
                DUDE.drawString(f);
                break;
                
            case "integer":
                DUDE.drawInteger(f);
                break;
                
            case "select":
                DUDE.drawSelect(f);
                break;

            case "checkbox":
                DUDE.drawCheckbox(f);
                break;

            case "radio":
                DUDE.drawRadio(f);
                break;

            case "submit":
                DUDE.drawSubmit(f);
                break;                
            }

        });

        // activate validation
        DUDE.container.validate(validation_options);

    },
    
    drawString: function(f) {
        var field = $.DIV(
            { className: "field" },
            $.LABEL({}, f.label),
            $.INPUT({ type: "text", name: f.name, className: f.className, value: typeof f.value == "undefined" ? "" : f.value  }),
            typeof f.description ? $.P({}, f.description) : $.SPAN({})
        );

        DUDE.container.append(field);
    },
 
    drawSubmit: function(f) {
        var field = $.DIV(
            { className: "field" },
            $.INPUT({ type: "submit", name: f.name })
        );
        
        DUDE.container.append(field);
    },

    drawInteger: function(f) {
        var field = $.DIV(
            { className: "field" },
            $.LABEL({}, f.label),
            $.INPUT({ type: "text", name: f.name, value: typeof f.value == "undefined" ? "" : f.value }),
            typeof f.description != "undefined" ? $.P({}, f.description) : $.SPAN({})
        );
        
        DUDE.container.append(field);
    },

    drawSelect: function(f) {

        var options = [];
        
        $.each(f.options, function(i, o) {
            options.push($.OPTION({ value: o.value, selected: f.value == o.value ? "selected" : null }, o.text));
        });

        var field = $.DIV(
            { className: "field" },
            $.LABEL({}, f.label),
            $.SELECT ({ name: f.name }, options),
            typeof f.description != "undefined" ? $.P({}, f.description) : null            
        );

        DUDE.container.append(field);
    },

    drawCheckbox: function(f) {
        var options = [];
        
        $.each(f.options, function(i, o) {
            options.push($.INPUT({ type: "checkbox", name: f.name, value: o.value, checked: f.value == o.value ? "checked" : null }),
                         $.SPAN({}, o.text));
        });

        var field = $.DIV(
            { className: "field" },
            $.LABEL({}, f.label),
            options,
            typeof f.description != "undefined" ? $.P({}, f.description) : null            
        );

        DUDE.container.append(field);
    },


    drawRadio: function(f) {
        var options = [];
        
        $.each(f.options, function(i, o) {
            options.push($.INPUT({ type: "radio", name: f.name, value: o.value, checked: f.value == o.value ? "checked" : null }),
                         $.SPAN({}, o.text));
        });

        var field = $.DIV(
            { className: "field" },
            $.LABEL({}, f.label),
            options,
            typeof f.description != "undefined" ? $.P({}, f.description) : null            
        );

        DUDE.container.append(field);
    }
    

};

$(document).ready(function() {
    DUDE.init();
    DUDE.render($("#form"), data);
});


































































































