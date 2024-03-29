import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import {listFiles} from 'list-files-in-dir';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor (private httpService: HttpClient) {  }
  
  fileText: any;
  myFiles:string [] = [];
  sMsg:string = '';

  ngOnInit () {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    } else {
      alert('Your browser is too old to support HTML5 Files API.');
    }
  }

  getFileDetails (e) {
    console.log("Files : ",e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);

      let reader = new FileReader();
      let file = e.target.files[i];
      //reader.readAsDataURL(file);
      //reader.readAsArrayBuffer(file);
      reader.readAsBinaryString(file);
      //reader.readAsText(file);
      
      //console.log("filename",e.target.files[i].name);
      //console.log("filetype",e.target.files[i].type);
      //console.log("reader", reader);
      //console.log("value",reader.result);

      // this.reader.onload = () => {
      //   this.form.get('avatar').setValue({
      //     filename: file.name,
      //     filetype: file.type,
      //     value: reader.result.split(',')[1]
      //   })
      // };

      reader.addEventListener("load", function () {
        var dataString = reader.result;
        console.log("dataString",dataString);
      }, false);
    
    }
  }
  
  uploadFiles () {
    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) {
      console.warn("Uploading File :",this.myFiles[i]);
      frmData.append("fileUpload", this.myFiles[i]);
      
    }

    // window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;


    // fs.readdirAsync('./XML').then(function(directories) {
    //   console.log(directories);
    // });
    
    // listFiles('.')
    // .then(files => {
    //   console.log(files);
    //     // do what ever you want with the file paths
    // });
    
    //console.table(frmData);
    // console.log("File Name :: ",fileName);
    // this.httpService.get('test.txt', {responseType: 'text'})
    //     .subscribe(
    //     (
    //       data => console.log(data)
    //     ),
    //     (
    //       err : HttpErrorResponse) => {
    //       console.log("Error :",err.message);
    //     });

    // this.httpService.post('http://localhost:50688/ImportDocuments/Excel', frmData).subscribe(
    //   data => {
    //     this.sMsg = data as string;
    //     console.log("Success :",this.sMsg);
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log("Error :",err.message);
    //   }
    // );
    
  }

  onInitFs(fs) {
  fs.root.getFile('log.txt', {}, function(fileEntry) {
      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
          var txtArea = document.createElement('textarea');
          txtArea.value = this.result;
          document.body.appendChild(txtArea);
        };

        reader.readAsText(file);
      }, errorHandler);

    }, errorHandler);

  }
}
