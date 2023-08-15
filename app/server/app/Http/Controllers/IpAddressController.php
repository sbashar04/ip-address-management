<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\IpAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class IpAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = ['success' => false];
        $ip_addresses = IpAddress::orderBy('id', 'desc')->paginate(20);
        $response['data']['ip_addresses'] = $ip_addresses;
        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $response = ['success' => false];
        $validator = Validator::make($request->all(), [
            'ip_address' => 'required|string|ip|unique:ip_addresses,ip_address',
            'label' => 'required|string',
        ]);

        if ($validator->fails())
        {
            $response['errors']['messages'] = $validator->errors();
            return response()->json($response, 422);
        }

        try{
            $userId = auth()->user()->id;
            $ipAddress = IpAddress::create([
                'ip_address' => $request->ip_address,
                'label' => $request->label,
                'user_id' => $userId,
            ]);

            // Logging
            AuditLog::create([
                'subject' => 'New IP Address Created',
                'log_type' => AuditLog::LOG_TYPE_ADDITION,
                'data_type' => AuditLog::DATA_TYPE_IP_ADDRESS,
                'old_data' => '',
                'new_data' => "IP address: {$request->ip_address} and label: {$request->label}",
                'table_updated' => app(IpAddress::class)->getTable(),
                'id_updated' => $ipAddress->id,
                'user_id' => $userId,
            ]);

            $response['success'] = true;
            $response['data']['ip_address'] = $ipAddress;

            return response()->json($response);
        }catch(\Exception $e) {
            Log::info($e->getMessage());
            $response['errors']['message'] = 'Server error occurred';
            return response()->json($response, 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IpAddress  $ipAddress
     * @return \Illuminate\Http\Response
     */
    public function show(IpAddress $ipAddress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IpAddress  $ipAddress
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IpAddress $ipAddress)
    {
        $response = ['success' => false];
        $validator = Validator::make($request->all(), [
            'label' => 'required|string',
        ]);

        if ($validator->fails())
        {
            $response['errors']['messages'] = $validator->errors();
            return response()->json($response, 422);
        }

        $oldData = "label: {$ipAddress->label}";
        $newData = "label: {$request->label}";

        try{
            $ipAddress->label = $request->label;
            $ipAddress->save();

            // Logging
            AuditLog::create([
                'subject' => 'IP Address Updated',
                'log_type' => AuditLog::LOG_TYPE_CHANGE,
                'data_type' => AuditLog::DATA_TYPE_IP_ADDRESS,
                'old_data' => $oldData,
                'new_data' => $newData,
                'user_id' => auth()->user()->id,
            ]);

            $response['success'] = true;
            $response['data']['ip_address'] = $ipAddress;

            return response()->json($response);
        }catch(\Exception $e) {
            Log::info($e->getMessage());
            $response['errors']['message'] = 'Server error occurred';
            return response()->json($response, 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IpAddress  $ipAddress
     * @return \Illuminate\Http\Response
     */
    public function destroy(IpAddress $ipAddress)
    {
        //
    }
}
