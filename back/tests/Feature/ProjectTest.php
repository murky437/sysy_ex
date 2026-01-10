<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

test('list', function () {
    $this->seed();

    $response = $this->getJson('/api/projects');

    $response
        ->assertStatus(200)
        ->assertJsonPath('data', [
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
});
