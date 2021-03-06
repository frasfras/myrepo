import React from "react";
import * as db from "../firestore";

const DEFAULT_LIST = {
  name: "",
  description: "",
  image: null,
}

function CreateList({user}) {

  const [submitted , setSubmitted] =  React.useState(false);  
const [list , setList] =  React.useState({
          name: "",
          description: "",
          image: null
        })


        function handleChange(event){
          const {name, value, files} = event.target;
         
          if( files) {
            const image = files[0];
            setList(prevState => ({...prevState, image }));
          }else{
            setList(prevState => ({...prevState, [name]: value } ));
          }
          
        }

     async  function handleCreateList(){
       try {
        await db.createLists(list, user);
        setList(DEFAULT_LIST);
       }catch (error){
         console.log(error);
       }finally {
         setSubmitted(false);
       }
         
        }
        
        
  return (
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
        WELCOME, {user.displayName.toUpperCase()}!
      </h1>
      <p className="lg:w-2/3 mx-auto mb-12 leading-relaxed text-base">
        To  start, create a thing  to share with a name and  image
      </p>
      <div className="lg:w-2/6 mx-auto md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add thing name"
          type="text"
          name="name"
          onChange = {handleChange}
          required
        />
        <textarea
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add short description"
          type="text"
          onChange = {handleChange}
          name="description"
        />
        <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add list name"
          type="file"
          name="image"
          onChange = {handleChange}
        />
        {list.image && (
          <img className="mb-4" src={URL.createObjectURL(list.image) } />
        )}

        <button  onClick={handleCreateList} className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
          Create Item
        </button>
        <p className="text-xs text-gray-600 mt-3">*Item name required</p>
      </div>
    </div>
  );
}

export default CreateList;
