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

  myFiles:string [] = [];
  sMsg:string = '';

  ngOnInit () {  }

  getFileDetails (e) {
    console.log("Files : ",e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    const frmData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) { 
      console.warn(this.myFiles[i]);
      frmData.append("fileUpload", this.myFiles[i]);

      var reader = new FileReader();
      reader.onload = function(e) {
        var arrayBuffer = reader.result;
      }
      console.log("Reader : ",reader);
    }
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
}
