<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuditLog>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'subject' => $this->faker->sentence(),
            'log_type' => 1,
            'data_type' => 'ip address',
            'old_data' => $this->faker->sentence(),
            'new_data' => $this->faker->sentence(),
            'user_id' => 1,
        ];
    }
}
