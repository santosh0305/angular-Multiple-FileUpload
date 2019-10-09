import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpErrorResponse } from '@angular/common/https/src/response';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  title = 'Upload Multiple Files in Angular 4';

  constructor (private httpService: HttpClient) {  }

  myFiles:string [] = [];
  sMsg:string = '';

  ngOnInit () {  }

  getFileDetails (e) {
    console.log(e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) { 
      console.warn(this.myFiles[i]);
      frmData.append("fileUpload", this.myFiles[i]);
    }
    
    console.table(frmData);

    this.httpService.post('http://localhost:50688/ImportDocuments/Excel', frmData).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        this.sMsg = data as string;
        console.log (this.sMsg);
      },
      // (err: HttpErrorResponse) => {
      //   console.log (err.message);    // Show error, if any.
      // }
    );
  }
}
