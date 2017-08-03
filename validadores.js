function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}


function validaMail() { 
    valor = document.getElementById("txtCorreo").value;
    console.log(valor);
    if( !(/^([A-Za-z0-9][A-Za-z0-9._]*[A-Za-z0-9]+|[A-Za-z0-9])@([A-Za-z0-9][A-Za-z0-9.-]*[A-Za-z0-9]+|[A-Za-z0-9])\.[A-Za-z0-9._]{2,}$/.test(valor)) ) {
        colorInput(0,"txtCorreo");
        mensajeError("txtCorreo","Ingrese un mail válido");
        return false;
    }else {
        colorInput(1,"txtCorreo");
        mensajeError("txtCorreo","");
        return true;
    }
}

function validaTexto(id){
	var texto = document.getElementById(id).value;
	if(!(/^[A-Za-záéíóúÁÉÍÓÚñÑ][A-Za-záéíóúÁÉÍÓÚñÑ ]*[A-Za-záéíóúÁÉÍÓÚñÑ]$/.test(texto))){
		colorInput(0,id);
        mensajeError(id,"No ingrese números ni carácteres especiales");
		return false;
	}else{
        colorInput(1,id);
        mensajeError(id,"");
		return true;
	}
}

function trimInput(){
    this.value = this.value.trim();
}


function validaCampos(){
    if(!(validaMail())){
        alert("mail incorrecto");
        return false;
    }else if (!(validaTexto(document.getElementById("txtNombre")))){ 
        alert("Nombre Incorrecto");
		return false;
    }else{
		alert(document.getElementById("txtNombre").value);
		return true;
	}
}


function colorInput(valor,id){
    if(valor == 0){
        document.getElementById(id).style.borderColor = "Red";
    }else if(valor == 1){
        document.getElementById(id).style.borderColor = "Green";
    }
}

function mensajeError(id,mensaje){
    document.getElementById(id+"Error").innerHTML = mensaje;
}
