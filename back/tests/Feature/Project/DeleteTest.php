<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

pest()->use(RefreshDatabase::class);

test('invalid slug', function () {
    $this->seed();

    $response = $this->delete('/api/projects/invalid-slug');

    $response
        ->assertStatus(404);
});


test('success', function () {
    $this->seed();

    $response = $this->delete('/api/projects/project-1');

    $response
        ->assertStatus(204);
});
