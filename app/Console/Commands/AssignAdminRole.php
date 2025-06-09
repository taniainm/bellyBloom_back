<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AssignAdminRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:assign-admin-role';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
{
    $email = $this->ask('Enter admin email:');
    
    try {
        // Dapatkan user dari Firebase
        $auth = app(Firebase\Auth::class);
        $user = $auth->getUserByEmail($email);
        
        // Update atau buat record role
        UserRole::updateOrCreate(
            ['firebase_uid' => $user->uid],
            ['email' => $email, 'role' => 'admin']
        );
        
        $this->info("User {$email} is now an admin");
    } catch (\Exception $e) {
        $this->error("Error: " . $e->getMessage());
    }
}
}
