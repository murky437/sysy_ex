<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Project::factory()->createMany([
            [
                'title' => 'Project 1',
                'slug' => 'project-1',
            ],
            [
                'title' => 'Project 2',
                'slug' => 'project-2',
            ],
            [
                'title' => 'Project 3',
                'slug' => 'project-3',
            ]
        ]);
    }
}
