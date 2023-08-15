<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('subject'); // Subject line of the request
            $table->tinyInteger('log_type'); // Addition | Change
            $table->string('data_type'); // Data Type can be User | IP Address
            $table->string('old_data');
            $table->string('new_data');
            $table->foreignIdFor(User::class); // User ID who updated
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('audit_logs');
    }
};
