"use strict";
/**
 * Aplicacion de lista NO ordenada con objetos
 */

function CustomError(codeErr)
/*Constructor de mensajes de error con objetos. Requiere un codigo para designar el nombre y mensaje*/
{
  switch (codeErr) {
    case 0:
    this.name = "ErrorListFull: ";
    this.message = "List is Full.";
      break;

    case 1:
    this.name = "ErrorListEmpty: ";
    this.message = "List is Empty.";
      break;

    case 2:
    this.name = "ErrorNotAObjectPerson: ";
    this.message = "This Element is not a Object Person.";
      break;

    case 3:
    this.name = "ErrorElementNotExist: ";
    this.message = "This Element not exist in the list.";
      break;

    case 4:
    this.name = "ErrorElementAlready: ";
    this.message = "This Element already exists in the list.";
      break;

    case 5:
    this.name = "ErrorConstructorCalledFunction: ";
    this.message = "Constructor called how function.";
      break;

    case 6:
    this.name = "Error No.7: ";
    this.message = "Not Implemented";
    break;

    default:
    this.name = "ErrorCode: ";
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
    set: function(newName){ name = newName }
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
  //----------------- "Propiedades" privadas
 
  var content = [];
  var capacity = ((Number.isInteger(cap)) && (cap > 0))? cap : 5 ;
  var size = (function(){
    var i=0
    while(i < capacity && (content[i] instanceof Person)){
      i++;
    }
    return i;
  });

//----------------- Metodos Privados o de un uso
  
  (function (){
    for (var i = 0; i < capacity; i++) {
      content[i] = new Object;
    }
  })(); // Inicializa el Objeto listPerson

  function place(){
    var i = 0;
    var placed = false;
    while(i < capacity-1 && !placed ){
      if(!(content[i] instanceof Person ) && (content[i+1] instanceof Person)){
        content[i] = content[i+1];
        content[i+1] = new Object; 
      }
      i++;
      if(!(content[i] instanceof Person ) && !(content[i+1] instanceof Person)){
        placed = true;
      }
    }
  }
  
//----------------- Metodos publicos

this.isEmpty = function ()
/*Metodo publico para indicar si la lista esta vacia*/
{ 
  if((content[0] instanceof Person)){
    return false;
  }else{
    return true;
  }
}

this.isfull = function()
/*Metodopublico para indicar si la lista esta llena*/
{ 
  if((content[capacity - 1] instanceof Person)){
    return true
  }else{
    return false;
  }
}

/*Metodo publico para obtener la capacidad de la lista*/
Object.defineProperty(this,"capacity",{ get: function() { return capacity } } );

/*Metodo publico para iterar los elementos de la lista con contenido*/
Object.defineProperty(this, "items", {
  get: function(){
    var nextIndex = 0;
    return{
      next: function(){
        return nextIndex < size() ? {value: content[nextIndex++], done:false}: {done: true};
      }
    }
  }
});

/*Metodo publico para mostrar el tamaño de la lista, numero de elementos*/
Object.defineProperty(this,"size",{ get: function() {return size} });

this.clear = function (){
  for (var i = 0; i < capacity; i++) {
    content[i] = new Object;
  }
};

  this.add = function(obj)
  /*Metodo publico para añadir un objeto de tipo person, devuelve el tamaño actual de la lista*/
  {
    if(!this.isFull && (obj instanceof Person)){
      var index = size();
      if(index < capacity){
        content.splice(index,1,obj);
        console.log("Object added: " + content[index].FullName());
      }
      return size();
    }
  };

  this.addAt = function(obj,index)
  /*Metodo publico para añadir un objeto de tipo person a la lista indicando la posicion, devuelve el tamaño actual de la lista*/
  {
    var added = -1;
    if(!this.isFull && (obj instanceof Person) && index < capacity){
      if((content[index]) instanceof Person){
        var aux = content[index];
        content.splice(index,1,obj);
        console.log("Object added: " + content[index].FullName());
        var placed = false;
        while(index < capacity && !placed){
          if(!(content[index] instanceof Person)){
            content[index] = aux;
            placed = true;
          }
          index++;
        }
        added = size();
      }else{
        if(!(content[index-1] instanceof Person)){ // si se inserta el elemento en mitad de la lista
        content.splice((index-1),1,obj);//lo desplazara
        console.log("Object added: " + content[index].FullName());
      }else{
        content.splice((index),1,obj);
        console.log("Object added: " + content[index].FullName());

        }
        added = size();
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
  var p2 = new Person("Yolanda","Gomez");
  var p3 = new Person("Jaime","Matas");
  var p4 = new Person("Antonio","Roldan");
  var p5 = new Person("Valeria","Asensio");

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
  console.log("Current list size: " + lista.add(p1));
  console.log("Current list size: " + lista.add(p2));
  console.log("Adding an object person at index 1...")
  console.log("Current list size: " + lista.addAt(p3,1));
  
  console.log("Current list content...");
  //Uso del iterador
  var ite = lista.items;
  var item = ite.next();
  while(!item.done){
    if(item.value instanceof Person){
      console.log("List element: "+item.value.FullName())
    }else{
      console.log("List element empty ")
    }
    item = ite.next();
  }
  console.log("---------- End testing listPerson objects ----------");

//}
//test();
