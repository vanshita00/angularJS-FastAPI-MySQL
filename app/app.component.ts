import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';
  tasks: any;
  
  newtask: any;
  item: any;


  constructor(private http:HttpClient){
    this.get_tasks()
  }

  
  get_tasks(){
   return this.http.get(`http://127.0.0.1:8000/get_tasks`).subscribe((res)=>{
    
    console.log(res)
    this.tasks=res;
    })
  }

  add_task(){
    let body=new FormData();
    body.append('task',this.newtask);
    this.http.post("http://127.0.0.1:8000/add_task",body).subscribe((res)=>{
      alert(res)
      this.newtask="";
      this.get_tasks();
    })
  }

  delete_task(id:any){
    let body=new FormData();
    body.append('id',id);
    this.http.post("http://127.0.0.1:8000/delete_task",body).subscribe((res)=>{
      alert(res)
      this.get_tasks();
    })
  }

}
