import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Group } from '../interfaces/group';
import { GroupStudent } from '../interfaces/group-student';
import { AddEditGroupRequest } from '../interfaces/add-edit-group-request';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private url = 'group';

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url);
  }

  getStudentsWithoutGroups(): Observable<GroupStudent[]> {
    return this.http.get<GroupStudent[]>('student/without-group');
  }
  deleteGroup(id: string): Observable<any> {
    return this.http.delete<GroupStudent[]>(this.url + '/' + id);
  }
  addGroup(formData: AddEditGroupRequest): Observable<any> {
    return this.http.post(this.url, formData);
  }

  editGroup(groupId: string, formData: AddEditGroupRequest): Observable<any> {
    return this.http.put(this.url + '/' + groupId, formData);
  }

  getGroupById(groupId: string): Observable<Group> {
    return this.http.get<Group>(this.url + '/' + groupId);
  }
}
