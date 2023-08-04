import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { Project } from 'src/app/project';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  newProject:Project = new Project();
  editProject:Project = new Project();
  editIndex:any = null;
  deleteProject:any=new Project();
  deleteIndex:any= null;

  constructor(private projetService:ProjectsService){

  }

  ngOnInit(): void {
    this.projetService.getAllProjects().subscribe(
      (response:Project[])=>{
        this.projects =  response;
      }
    );
    
  }

  onSaveClick(){
    this.projetService.insertProject(this.newProject).subscribe((response:any)=>{
      var p: Project = new Project();
      p.projectId = response.projectId;
      p.projectName = response.projectName;
      p.dateOfStart = response.dateOfStart;
      p.teamSize = response.teamSize;
      this.projects.push(p);

      this.newProject.projectId = 0;
      this.newProject.projectName = "";
      this.newProject.dateOfStart = "";
      this.newProject.teamSize = 0;
    },
    (error:any)=>{
      console.log(error);
    });
  }

  onEditClick(event:any,index:number){
    this.editProject.projectId = this.projects[index].projectId;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart;
    this.editProject.teamSize = this.projects[index].teamSize;

    this.editIndex = index;
  }

  onUpdateClick(){

    this.projetService.updateProject(this.editProject).subscribe(
      (response:Project)=>{
        var p:Project = new Project();
        p.projectId = response.projectId;
        p.projectName = response.projectName;
        p.teamSize =  response.teamSize;
        p.dateOfStart = response.dateOfStart;
        this.projects[this.editIndex] = p;

        this.newProject.projectId = 0;
        this.newProject.projectName = "";
        this.newProject.dateOfStart = "";
        this.newProject.teamSize = 0;
        
    },
    (error)=>{
      console.log(error)
    })
  }

  onDeleteClick(event:any,index:number){
    this.deleteProject.projectId = this.projects[index].projectId;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
  }
  onDeleteConfirmClick(){

    this.projetService.deleteProject(this.deleteProject.projectId).subscribe(
      (response)=>{
        this.projects.splice(this.deleteIndex,1);
        this.deleteProject.projectId = 0;
        this.deleteProject.projectName = "";
        this.deleteProject.dateOfStart = "";
        this.deleteProject.teamSize = "";

    },(error)=>{

    })
  }

}
