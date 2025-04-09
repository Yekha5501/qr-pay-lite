<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Transaction; // Assuming you have a Transaction model

class PaymentController extends Controller
{
    public function makePayment(Request $request)
    {
        // Assume scanned QR code contains payment data: sender_id, receiver_id, amount
        $paymentData = $request->input('paymentData');
        $senderId = $paymentData['sender_id']; // Sender ID from QR
        $receiverId = $paymentData['receiver_id']; // Receiver ID from QR
        $amount = $paymentData['amount']; // Amount to be sent

        // Retrieve sender and receiver users from the database
        $sender = User::find($senderId);
        $receiver = User::find($receiverId);

        if (!$sender || !$receiver) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }

        // Check if the sender has enough balance
        if ($sender->balance < $amount) {
            return response()->json(['status' => 'error', 'message' => 'Insufficient funds'], 400);
        }

        // Begin transaction: Deduct amount from sender and add to receiver
        \DB::beginTransaction();

        try {
            // Deduct from sender
            $sender->balance -= $amount;
            $sender->save();

            // Add to receiver
            $receiver->balance += $amount;
            $receiver->save();

            // Create a transaction record
            Transaction::create([
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id,
                'amount' => $amount,
                'status' => 'completed',
            ]);

            \DB::commit();

            return response()->json(['status' => 'success', 'amount' => $amount], 200);
        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json(['status' => 'error', 'message' => 'Transaction failed'], 500);
        }
    }
}
