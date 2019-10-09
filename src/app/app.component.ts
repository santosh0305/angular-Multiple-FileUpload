import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  title = 'Upload Multiple Files';

  constructor (private httpService: HttpClient) {  }

  myFiles:string [] = [];
  sMsg:string = '';

  ngOnInit () {  }

  getFileDetails (e) {
    //console.log(e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles (fileName : any) {
    const frmData = new FormData();
    
    for (var i = 0; i < this.myFiles.length; i++) { 
      //console.warn(this.myFiles[i]);
      frmData.append("fileUpload", this.myFiles[i]);
    }

    //console.table(frmData);
    console.log("File Name :: ",fileName);
    this.httpService.get('test.txt', {responseType: 'text'})
        .subscribe(
        (
          data => console.log(data)
        ),
        (
          err : HttpErrorResponse) => {
          console.log("Error :",err.message);
        });

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
