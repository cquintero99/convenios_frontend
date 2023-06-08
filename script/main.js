const urlBassic = "https://conveniosbackend-production.up.railway.app"

async function listaConveniosUFPS() {
    const result = await fetch(urlBassic + "/convenios/lista")
    return result
}
async function listaEmpresa() {
    const result = await fetch(urlBassic + "/empresa")
    return result
}
async function entrarLogin(usuario) {

    const result = await fetch(urlBassic+"/usuario/login",{
        method:'POST',
        body:JSON.stringify(usuario),
        headers: {
            'Content-Type': "application/json"
          }
    })
    return result
}
async function saveConvenio(convenio) {

    const result = await fetch(urlBassic+"/convenios/save",{
        method:'POST',
        body:JSON.stringify(convenio),
        headers: {
            'Content-Type': "application/json"
          }
    })
    return result
}
function verEmpresas(){
    listaEmpresa()
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        let body=`<option value="">Seleccione una empresa</option>`
        for (let i = 0; i < data.length; i++) {
            body+=`
            <option value="${data[i].id}">${data[i].nombre}</option>`
            
        }
        document.getElementById("empresa").innerHTML=body;
    })
    .catch(err=>{
        console.log(err)
    })
}

function iniciarSecion(){
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    const usuario={
        email,
        password
    }
    console.log(usuario)
        //window.location.href="./admin/index.html"
        entrarLogin(usuario)
        .then(response=>response.json())
        .then(data=>{
           // console.log(data)
            window.location.href="./admin/index.html"
        })
        .catch(err=>{
            console.log(err)
        })
        .finally(final=>{
    
        })
   
}
function registrarConvenio(){
    let fechaInicio=document.getElementById("fechaInicio").value
    let nombre=document.getElementById("nombre").value
    let sector =document.getElementById("sector").value
    let duracion=document.getElementById("duracion").value
    let empresa=document.getElementById("empresa").value
    let estado =document.getElementById("estado").value
    let link =document.getElementById("estado").value
    const convenio={
        nombre,
        sector:sector,
        duraccion:duracion,
        empresa:{
            id:empresa
        },
        usuario_id:1,
        estado:estado,
        link,
        fechaRegistro:fechaInicio
    }
    console.log(convenio)
    saveConvenio(convenio)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
    })
    .catch(err=>{
        console.log(err)
    })


}

function verLista() {
    listaConveniosUFPS()
  .then(response => response.json())
  .then(datos => {
    console.log(datos);
    var counter = 1;
    
    let tabla = $('#tabla').DataTable();
    tabla.clear().draw();
    
    for (let i = 0; i < datos.length; i++) {
      tabla.row.add([
        datos[i].nombre,
        datos[i].sector,
        datos[i].duraccion,
        datos[i].empresa.representante,
        datos[i].estado,
        datos[i].link
      ]).draw(false);
      
      counter++;
    }
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // Acciones finales si las hay
  });
}
/**
 * Inicializa el plugin DataTable en el elemento con el id "tabla".
 */
$(document).ready(function () {
    $('#tabla').DataTable({
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": '<i class="bi bi-chevron-double-left"></i>',
                "sLast": '<i class="bi bi-chevron-double-right"></i>',
                "sNext": '<i class="bi bi-chevron-right"></i>',
                "sPrevious": '<i class="bi bi-chevron-left"></i>'
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": '<i class="bi bi-files"></i> Copiar',
                "colvis": '<i class="bi bi-eye"></i> Visibilidad'
            }
        }
    });
});