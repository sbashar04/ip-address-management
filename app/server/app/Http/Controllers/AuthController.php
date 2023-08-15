<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $response = ['success' => false];
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails())
        {
            $response['errors']['messages'] = $validator->errors();
            return response()->json($response, 422);
        }

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (auth()->attempt($credentials)) {
            $user = Auth::user();
            $user['token'] = $user->createToken('Laravel Passport Personal Token')->accessToken;
            $response['success'] = true;
            $response['data']['user'] = $user;
            return response()->json($response, 200);
        }
        $response['errors']['message'] = 'Invalid credentials';
        return response()->json($response, 422);
    }

    public function register(Request $request)
    {
        $response = ['success' => false];
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails())
        {
            $response['errors']['messages'] = $validator->errors();
            return response()->json($response, 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $response['success'] = true;
        $response['data']['user'] = $user;
        return response()->json($response);
    }

    public function logout(Request $request)
    {
        try {
            $token = $request->user()->token();
            $token->revoke();
            return response()->json(['success' => true, 'message' => 'Logout successful!'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Request was unsuccessful.'], 422);
        }
    }
}
