# Tema 4:   Objetos en JavaScript - Lista con Objetos  

## Version 1.0.0  
Creacion del constructor para objetos Person  
```[javascript]
function Person(name,premane)  
/*Constructor de objetos person */  
{  
  var name = name || "a name";  
  var surname = surname || "a Surname"  
  Object.defineProperty(this, "name", {  
      get: function () { return name},  
      set: function(newName){ name = newName}  
  });  
  Object.defineProperty(this, "surname", {  
    get: function () { return surname},  
    set: function(newSurname){ surname = newSurname}  
  });  
  
  this.FullName = function(){  
    return name + " " + surname;  
  }  
}  
Person.prototype.constructor = Object.create(Person);  
```
Creacion del constructor para objetos CustomError.  
Este tipo de objetos se usan para la gestion de los distintos tipos de error.
  
Creacion del constructor listPerson.  
Este objeto sera la lista que contendra los objetos lista. Sus metodos permitiran modificar la lista de objetos  
  
## Version 0.0.0  
Inicio del proyecto:  
* Creacion de directorios  
* Creacion de los archivos Basicos  
* Añadido de Archivos plantilla: html y css  
* Creacion de Archivos js: Aplicacion y control html  
