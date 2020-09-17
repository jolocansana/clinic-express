import axios from 'axios'
import { connect } from 'mongoose';
import e from 'express';

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const url = 'http://localhost:5000/api/files';


// Create a storage object with a configuration 
const storage = new GridFsStorage({ url });

// Set multer storage engine to the newly created object
const upload = multer({ storage });

class FileService {

    // getting files through searching File name
    static getFile(query) {
        return new Promise((resolve, reject) => {
            try{
               let searchQuery = '';
               if(query !== '') searchQuery = `?s=${query}`;

               axios.get(url)
                .then((res) => {
                    const { data } = res;
                    resolve(
                        data.map((files) => ({
                        ...files,
                        link: ``, // TODO: link of opening a file
                        })),
                    );
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }

    static createFile(file){
        return new Promise((resolve, reject) => {
            try{
                return axios.post(url,file);
            } catch (err) {
                console.log(err);
                reject (err);
            }
        });
    }

    static deleteFile(fileID){
        return new Promise((resolve, reject) =>{
            try{
                axios.delete(fileID);
            } catch(err) {
                console.log(err);
                reject(err);
            }
        });
    }


}

export default FileService;
