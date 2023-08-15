<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{

    public const LOG_TYPE_ADDITION = 1;
    public const LOG_TYPE_CHANGE = 2;

    public const DATA_TYPE_IP_ADDRESS = 'ip address';


    use HasFactory;
    protected $fillable = ['subject', 'log_type', 'data_type', 'old_data', 'new_data', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
