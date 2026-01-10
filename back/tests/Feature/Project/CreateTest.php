<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

test('empty input', function () {
    $this->seed();

    $response = $this->postJson('/api/projects');

    $response
        ->assertStatus(422)
        ->assertJsonPath('errors', [
            'title' => [
                'The title field is required.'
            ],
            'slug' => [
                'The slug field is required.'
            ]
        ]);
});

test('invalid slug', function () {
    $this->seed();

    $response = $this->postJson('/api/projects', [
        'title' => 'Project 1',
        'slug' => 'project-1',
    ]);

    $response
        ->assertStatus(422)
        ->assertJsonPath('errors', [
            'slug' => [
                'The slug has already been taken.'
            ]
        ]);
});

test('success', function () {
    $this->seed();

    $response = $this->postJson('/api/projects', [
        'title' => 'Project 4',
        'slug' => 'project-4',
    ]);

    $response
        ->assertStatus(201)
        ->assertJsonPath('data', [
            'title' => 'Project 4',
            'slug' => 'project-4',
        ]);
});
