"use strict";
/**
 * Aplicacion de lista NO ordenada con objetos
 */

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
    this.message = "This Element already exists in the list.";
      break;

    case 5:
    this.name = "Error No.6: ";
    this.message = "Constructor called how function.";
      break;

    case 6:
    this.name = "Error No.7: ";
    this.message = "Not Implemented";
    break;

    default:
    this.name = "Error code: ";
    this.message = "Not error code especified";

      break;
  }
}
CustomError.prototype = Object.create(new Error);

function Person(name,surname)
/*Constructor de objetos person */
{
  if(!(this instanceof Person)) throw new CustomError(5);
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


function listPerson(cap)
/*Constructor de objetos listPerson */
{
  if(!(this instanceof listPerson)) throw new CustomError(5);
  var that = this;
  var content = new Array();

  Object.defineProperty(this,"content",{
    get: function(){return content}
  })

  var capacity = ((Number.isInteger(cap)) && (cap > 0))? cap : 5 ;
  Object.defineProperty(this,"capacity",{ get: function() { return capacity } } );

  var size = (function(){
    var i=0
    while(i < capacity && isPersonObj(content[i])){
      i++;
    }
    return i;
  });
  Object.defineProperty(this,"size",{ get: function() {return size} });

  (function (){
    for (let i = 0; i < capacity; i++) {
      content[i] = new Object;
    }
  })(); // Inicializa el Objeto listPerson

  function isEmpty(){
    if((content[0] instanceof Person)){
      return false;
    }else{
      return true;
    }

    //return (!(content[0] instanceof Person))? true : false ;
  }

  function isFull(){
   if((content[capacity - 1] instanceof Person)){
     return true
   }else{
     return false;
   }
  }

  function isPersonObj(obj){
    return ((obj instanceof Person))? true : false;
  }

  this.clear = function (){
    for (let i = 0; i < capacity; i++) {
      content[i] = new Object;
    }
  }

  this.add = function(obj){
    if(!isFull() && isPersonObj(obj)){
      var index = size();
      if(index < capacity){
        content.splice(index,1,obj);
        console.log("Object added: " + content[index].FullName());
      }
      return size();
    }
  }
  this.addAt = function(obj,index){
    var added = -1;
    if(!isFull() && isPersonObj(obj) && index < capacity){
      if((content[index]) instanceof Person){
        var aux = content[index];
        content.splice(index,1,obj);
        console.log("Object added: " + content[index].FullName());
      }else{
        content.splice(index,1,obj);
        console.log("Object added: " + content[index].FullName());
      }
    }
    return added;
  }
}



//function test(){
  console.log("---------- Testing person objects ----------");
  console.log("Create an object person...");
  var p1 = new Person();
  console.log("Assing values to the object...");
  p1.name = "Alicia";
  p1.surname = "Waters";
  console.log("View values of object...");
  console.log("Name: " + p1.name + ". Surname: " + p1.surname);
  console.log("Full name of person: " + p1.FullName());
  try {
    var p2err = Person();
  } catch (e) {
    console.log(e.name + "" + e.message);
  }
  console.log("---------- End testing person objects ----------");
  console.log("");

  console.log("---------- Testing listPerson objects ----------");
  console.log("Create a new listPerson without capacity parametrer....")
  var lista = new listPerson();
  try {
    var listaErr = listPerson();
  } catch (e) {
    console.log(e.name + "" + e.message);
  }
  console.log("List capacity: " + lista.capacity);
  console.log("List size: " + lista.size());
  console.log("Adding an object person...");
  var added = lista.add(p1);
  console.log("Current list size: " + added);
  var p3 = new Person("Yolanda","Gomez");
  added = lista.add(p3);
  console.log("Current list size: " + added);
  console.log("---------- End testing listPerson objects ----------");

//}
//test();
