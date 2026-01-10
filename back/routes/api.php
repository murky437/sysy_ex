<?php

use App\Http\Controllers\GetProjectList;
use Illuminate\Support\Facades\Route;

Route::get('/projects', GetProjectList::class);
