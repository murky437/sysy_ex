<?php

use App\Http\Controllers\CreateProject;
use App\Http\Controllers\DeleteProject;
use App\Http\Controllers\GetProjectList;
use Illuminate\Support\Facades\Route;

Route::get('/projects', GetProjectList::class);
Route::post('/projects', CreateProject::class);
Route::delete('/projects/{project:slug}', DeleteProject::class);
