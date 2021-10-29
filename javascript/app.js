/**
 * Seccion CLoud
 */

function consultarCloud(){
    $.ajax({
        url:"https://localhost:8080/api/Cloud/all",
        type:"GET",
        dataType:"json",
        success: function(response){
            $("#contenidoTablaCloud").empty();
            response.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.brand));
                row.append($("<td>").text(element.year));
                row.append($("<td>").text(element.description));
                row.append($("<td class='accion'>").append('<button type="button" class="button" onclick="editCloud('+element.id+')"><span><i class="icon ion-md-create lead"></i></sapan></button>'));
                row.append($("<td class=''>").append('<button type="button" class="button" onclick="eliminarCloud('+element.id+',\''+element.name+'\')"><span><i class="icon ion-md-trash lead"></i></sapan></button>'));
                $("#contenidoTablaCloud").append(row);
            });
        },
        error: function(xhr,status){
            alert("Ocurrio un error en el consumo");
        },
    });
}

function createCloud(){
    var id = $("#idCloud").val();
    var brand = $("#brandCloud").val();
    var model = $("#modelCloud").val();
    var category_id = $("#categoryIdCloud").val();
    var name = $("#nameCloud").val();
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/cloud/cloud",
        type:"POST",
        dataType:"json",
        data:{
            id:id,
            brand:brand,
            model:model,
            category_id:category_id,
            name:name,
            
        },
        statusCode: {
            201: function(){
                $("#idCloud").val("");
                $("#idCloud").attr("readonly",false);
                $("#brandCloud").val("");
                $("#modelCloud").val("");
                $("#categoryIdCloud").val("");
                $("#nameCloud").val("");
                consultarCloud();
                alert("Se ha registrado la nube");
            }
        }
    });
}

function updateCloud(){
    var id = $("#idCloud").val();
    var brand = $("#brandCloud").val();
    var model = $("#modelCloud").val();
    var category_id = $("#categoryIdCloud").val();
    var name = $("#nameCloud").val();
    var data = {
        id:id,
        brand:brand,
        model:model,
        category_id:category_id,
        name:name,
    };
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/cloud/cloud",
        type:"PUT",
        dataType:"json",
        data:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function(){
                $("#idCloud").val("");
                $("#idCloud").attr("readonly",false);
                $("#brandCloud").val("");
                $("#modelCloud").val("");
                $("#categoryIdCloud").val("");
                $("#nameCloud").val("");
                consultarCloud();
                alert("Se ha actualizado el cloud");
            }
        }
    });
    
}

function editCloud(id){
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/cloud/cloud/?id="+id,
        type:"GET",
        dataType:"json",
        success: function (response){
            if(response.items.length>0){
                $("#idCloud").val(response.items[0].id);
                $("#idCloud").attr("readonly",true);
                $("#brandCloud").val(response.items[0].brand);
                $("#modelCloud").val(response.items[0].model);
                $("#categoryIdCloud").val(response.items[0].category_id);
                $("#nameCloud").val(response.items[0].name);
            }else{
                alert("No se encontró el registro.");
            }
        },
        error: function(xhr,status){
            alert("Ocurrió un error");
        }
    });
}

function eliminarCloud(id,name){
    var r = confirm("Segur@ de eliminar el cloud: "+id+" con nombre: "+name); //Primero preguntamos si está seguro de eliminar.
    if (r == true) { //Si está seguro, procedemos a eliminar.
        var data = {
            id:id
        }; //Creamos un objeto con los datos a eliminar.
        $.ajax({
            url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/cloud/cloud",
            type:"DELETE",
            dataType:"json",
            data:JSON.stringify(data), //convertimos el objeto a un string para que sea compatible con el formato de la API.
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function(){ //Si la API devuelve un código 204, significa que se eliminó correctamente.
                    consultarCloud(); //Consultamos nuevamente la tabla para actualizarla.
                }
            }
        });
    }
    
}

/**
 * Seccion Client
 */
function consultarClient(){
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        dataType:"json",
        success: function(response){
            $("#contenidoTablaClient").empty();
            response.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.name));
                row.append($("<td>").text(element.email));
                row.append($("<td>").text(element.age));
                row.append($("<td class='accion'>").append('<button type="button" class="button" onclick="editClient('+element.id+')"><span><i class="icon ion-md-create lead"></i></sapan></button>'));
                row.append($("<td class=''>").append('<button type="button" class="button" onclick="eliminarClient('+element.id+',\''+element.name+'\')"><span><i class="icon ion-md-trash lead"></i></sapan></button>'));
                $("#contenidoTablaClient").append(row);
            });
        },
        error: function(xhr,status){
            alert("Ocurrio un error en el consumo");
        },
    });
}

function createClient(){
    var id = $("#idClient").val();
    var name = $("#nameClient").val();
    var email = $("#emailClient").val();
    var age = $("#ageClient").val();
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        dataType:"json",
        data:{
            id:id,
            name:name,
            email:email,
            age:age,
        },
        statusCode: {
            201: function(){
                $("#idClient").val("");
                $("#idClient").attr("readonly",false);
                $("#nameClient").val("");
                $("#emailClient").val("");
                $("#ageClient").val("");
                consultarClient();
                alert("Se ha registrado el cliente");
            }
        }
    });
}

function updateClient(){
    var id = $("#idClient").val();
    var name = $("#nameClient").val();
    var email = $("#emailClient").val();
    var age = $("#ageClient").val();
    var data = {
            id:id,
            name:name,
            email:email,
            age:age,
    };
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        dataType:"json",
        data:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function(){
                $("#idClient").val("");
                $("#idClient").attr("readonly",false);
                $("#nameClient").val("");
                $("#emailClient").val("");
                $("#ageClient").val("");
                consultarClient();
                alert("Se ha actualizado el client");
            }
        }
    });
    
}

function editClient(id){
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/client/client/?id="+id,
        type:"GET",
        dataType:"json",
        success: function (response){
            if(response.items.length>0){
                $("#idClient").val(response.items[0].id);
                $("#idClient").attr("readonly",true);
                $("#nameClient").val(response.items[0].name);
                $("#emailClient").val(response.items[0].email);
                $("#ageClient").val(response.items[0].age);
            }else{
                alert("No se encontró el registro.");
            }
        },
        error: function(xhr,status){
            alert("Ocurrió un error");
        }
    });
}

function eliminarClient(id,name){
    var r = confirm("Segur@ de eliminar el cliente: "+id+" con nombre: "+name); //Primero preguntamos si está seguro de eliminar.
    if (r == true) { //Si está seguro, procedemos a eliminar.
        var data = {
            id:id
        }; //Creamos un objeto con los datos a eliminar.
        $.ajax({
            url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/client/client",
            type:"DELETE",
            dataType:"json",
            data:JSON.stringify(data), //convertimos el objeto a un string para que sea compatible con el formato de la API.
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function(){ //Si la API devuelve un código 204, significa que se eliminó correctamente.
                    consultarClient(); //Consultamos nuevamente la tabla para actualizarla.
                }
            }
        });
    }
    
}

/**
 * Seccion Message
 */

function consultarMessage(){
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        dataType:"json",
        success: function(response){
            $("#contenidoTablaMessage").empty();
            response.items.forEach(element => {
                var row = $("<tr>");
                row.append($("<td>").text(element.id));
                row.append($("<td>").text(element.messagetext));
                row.append($("<td class='accion'>").append('<button type="button" class="button" onclick="editMessage('+element.id+')"><span><i class="icon ion-md-create lead"></i></span></button>'));
                row.append($("<td class=''>").append('<button type="button" class="button" onclick="eliminarMessage('+element.id+',\''+element.textmessage+'\')"><span><i class="icon ion-md-trash lead"></i></span></button>'));
                $("#contenidoTablaMessage").append(row);
            });
        },
        error: function(xhr,status){
            alert("Ocurrio un error en el consumo");
        },
    });
}

function createMessage(){
    var id = $("#idMessage").val();
    var messagetext = $("#messagetext").val();
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        dataType:"json",
        data:{
            id:id,
            messagetext:messagetext,
        },
        statusCode: {
            201: function(){
                $("#idMessage").val("");
                $("#messagetext").attr("readonly",false);
                consultarMessage();
                alert("Se ha registrado el mensaje");
            }
        }
    });
}

function updateMessage(){
    var id = $("#idMessage").val();
    var messagetext = $("#messagetext").val();
    var data = {
            id:id,
            messagetext:messagetext,
    };
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        dataType:"json",
        data:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            201: function(){
                $("#idMessage").val("");
                $("#idMessage").attr("readonly",false);
                $("#messagetext").val("");
                consultarMessage();
                alert("Se ha actualizado el mensaje");
            }
        }
    });
    
}

function editMessage(id){
    $.ajax({
        url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/message/messge/?id="+id,
        type:"GET",
        dataType:"json",
        success: function (response){
            if(response.items.length>0){
                $("#idMessage").val(response.items[0].id);
                $("#idMessage").attr("readonly",true);
                $("#messagetext").val(response.items[0].messagetext);
            }else{
                alert("No se encontró el registro.");
            }
        },
        error: function(xhr,status){
            alert("Ocurrió un error");
        }
    });
}


function eliminarMessage(id,messagetext){
    var r = confirm("Segur@ de eliminar el mensaje: "+id); //Primero preguntamos si está seguro de eliminar.
    if (r == true) { //Si está seguro, procedemos a eliminar.
        var data = {
            id:id
        }; //Creamos un objeto con los datos a eliminar.
        $.ajax({
            url:"https://g999ddba23a6e1f-db202109300648.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/message/message",
            type:"DELETE",
            dataType:"json",
            data:JSON.stringify(data), //convertimos el objeto a un string para que sea compatible con el formato de la API.
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function(){ //Si la API devuelve un código 204, significa que se eliminó correctamente.
                    consultarMessage(); //Consultamos nuevamente la tabla para actualizarla.
                }
            }
        });
    }
    
}

$(document).ready(function(){
    consultarClient();
    consultarCloud();
    consultarMessage();
});
