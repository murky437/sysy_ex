<?php

namespace App\Http\Controllers;

use App\Models\Project;

class DeleteProject extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Project $project)
    {
        $project->delete();

        return response()->noContent();

    }
}
