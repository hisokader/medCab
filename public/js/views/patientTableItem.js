define(
    [
        'jquery',
        'underscore',
        'backbone',
        'js/models/patient_md',
        'text!templates/patientTableItem.html'
    ],function($,_,Backbone,Patients_cl,Template){
    
    var patientTableItem_vw = Backbone.View.extend({
        tagName:'tr',
        template: _.template(Template),
        events: {
            'click td.center img':'showDetails'
        },
        showDetails:function(event){
            event.preventDefault();
            var tr=this.$el;
            var oTable=this.$el.parents('table').dataTable();
            if ( oTable.fnIsOpen(tr[0])){
                /* This row is already open - close it */
                tr.children('td').find('img').attr('src',"images/details_open.png");
                oTable.fnClose(tr[0]);
            }else{
                /* Open this row */
                tr.children('td').find('img').attr('src',"images/details_close.png");
                oTable.fnOpen( tr[0], this.patientItemDetails(), 'details' );
            }

        },
        initialize:function(model){
            this.model=model;
        },
        render: function(){
            this.$el.html(this.template({patient:this.model.toJSON()}));
          return this;
        },
        patientItemDetails:function(){
            var template= '<div class="row-fluid">';

            template+='<div class="col-md-6">';
            template+='<dl style="padding-left:0px;" class="dl-horizontal">';
            template+='<dt>Nom & Prénom :</dt>';
            template+='<dd>'+this.model.attributes.lastName+' '+this.model.attributes.firstName+'</dd>';
            template+='<dt>Né le :</dt>';
            template+='<dd>'+this.model.attributes.dayBirth+'</dd>';
            template+='<dt>Adresse :</dt>';
            template+='<dd>'+this.model.attributes.adress+'</dd>';
            template+='<dt>GSM :</dt>';
            template+='<dd>'+this.model.attributes.gsm+'</dd>';
            template+='<dt>Tel :</dt>';
            template+='<dd>'+this.model.attributes.tel+'</dd>';
            template+='</dl>';
            template+='</div>';

            template+='<div class="col-md-6">';
            template+='<dl style="padding-left:0px;" class="dl-horizontal">';
            template+='<dt>Nom & Prénom :</dt>';
            template+='<dd>'+this.model.attributes.lastName+' '+this.model.attributes.firstName+'</dd>';
            template+='<dt>Né le :</dt>';
            template+='<dd>'+this.model.attributes.dayBirth+'</dd>';
            template+='<dt>Adresse :</dt>';
            template+='<dd>'+this.model.attributes.adress+'</dd>';
            template+='<dt>GSM :</dt>';
            template+='<dd>'+this.model.attributes.gsm+'</dd>';
            template+='<dt>Tel :</dt>';
            template+='<dd>'+this.model.attributes.tel+'</dd>';
            template+='</dl>';
            template+='</div>';

            template+= '</div>';
            return template;
        }
    });
    
    return patientTableItem_vw;
});