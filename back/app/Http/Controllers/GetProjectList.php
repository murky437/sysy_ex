<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectListResource;
use App\Models\Project;
use Illuminate\Http\Request;

class GetProjectList extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $projects = Project::query()->get();

        return ProjectListResource::collection($projects);
    }
}
