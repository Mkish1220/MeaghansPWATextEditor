import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// GET function
export const getDb = async (value) => {
  console.log('Getting data from the jateDB');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const objStore = tx.objectStore('jate');
  // use the .getAll() method to grab all the content in the DB
  const req = objStore.getAll()
  // confirm the data was fetched
  const res = await req;
  console.log('data saved to the jateDB', res);
};



// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value)  => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id:id, value:value });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};



// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => {
// const jateDb = await openDB('jate', 1);
// const tx = jateDb.transaction('jate', 'readonly');
// const store = tx.objectStore('jate');
// const request = store.get();
// const result = await request;
// console.log(result);
// return result;
// };


initdb();
