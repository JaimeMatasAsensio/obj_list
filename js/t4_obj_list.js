"use strict";
/**
 * Aplicacion de lista NO ordenada con objetos
 */

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

function listPerson(cap){
  var content = [];
  
  var capacity  = (Number.isInteger(cap) && cap > 0)? cap : 5;//Comprueba que el parametro pasado sea un numero entero, si no lo es le asigna un tamaño fijo
  Object.defineProperty(this,"capacity",{ get: function (){ return capacity } });
  
  var size = (function(){
    var i = 0;
    var EndCont = false;
    while (i < capacity && !EndCont){
      if(!(content[i] instanceof Person)){
        EndCont = true;
      }else{// Cuidadin....
        i++;
      }
    }
    return i;
  })();
  this.Add = function(obj){
    if(obj instanceof Person){
      content.push(obj);
      return size;
    }
  }
}

function CustomError(codeErr)
/*Constructor de mensajes de error con objetos. Requiere un codigo para designar el nombre y mensaje*/
{
  switch (codeErr) {
    case 0:
    this.name = "Error No.1: ";
    this.message = "List is Full.";
      break;

    case 1:
    this.name = "Error No.2: ";
    this.message = "List is Empty.";
      break;

    case 2:
    this.name = "Error No.3: ";
    this.message = "This Element is not a Object Person.";
      break;

    case 3:
    this.name = "Error No.4: ";
    this.message = "This Element not exist in the list.";
      break;

    case 4:
    this.name = "Error No.5: ";
    this.message = "This Element alredy exists in the list.";
      break;

    case 5:
    this.name = "Error No.6: ";
    this.message = "Not implemented";
      break;

    case 6:
    this.name = "Error No.7: ";
    this.message = "Not Implemented";
    break;

    default:
    this.name = "Error Unknown: ";
    this.message = "Unknown error message...";

      break;
  }
}




function test(){
  console.log("---------- Testing person objects ----------");
  console.log("Create an object person...");
  var p1 = new Person();
  console.log("Asing values to the object...");
  p1.name = "Alicia";
  p1.surname = "Waters";
  console.log("View values of object...");
  console.log("Name: " + p1.name + ". Surname: " + p1.surname);
  console.log("Full name of person: " + p1.FullName());
  console.log("---------- End testing person objects ----------");
  console.log("");
  console.log("---------- Testing listPerson objects ----------");

  console.log("---------- End testing listPerson objects ----------");

}
test();
