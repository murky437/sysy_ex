<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectListResource;
use App\Models\Project;
use Illuminate\Http\Request;

class CreateProject extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:projects,slug',
        ]);

        $project = Project::create($validated);

        return (new ProjectListResource($project))
            ->response()
            ->setStatusCode(201);

    }
}
