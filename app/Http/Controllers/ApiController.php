<?php

namespace App\Http\Controllers;

use App\Models\todo;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = todo::all();

        return response()->json($contents);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $todo = new todo;
        $todo->content = $request->content;

        $todo->save();

        return response()->json([
            'status' =>200,
            'todo' => $todo,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $todo = todo::find($id);
        if(is_null($todo)){
            return response()->json([
                'status' => 400,
                'message' => '対象のtaskが存在しません',
            ]);
        }
        $todo->completed = $request->completed ? 1: 0;
        $todo->save();

        return response()->json([
            'status' => 200,
            'todo' => $todo,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
