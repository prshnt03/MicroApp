<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MyImages;

class FileuploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->file('imgFile')) {
            // $image = $request->get('file');
            //$name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            //Image::make($request->get('file'))->save(public_path('upload/').$name);

            $image64 = 'data:image/jpeg;base64,'. base64_encode(file_get_contents($request->file('imgFile')));
            //echo $image64;

            $folderPath = public_path('upload/');

            $image_parts = explode(";base64,", $image64);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);

            $imageName = uniqid() . '.png';

            $imageFullPath = $folderPath . $imageName;
            file_put_contents($imageFullPath, $image_base64);

            $saveFile = new MyImages();
            $saveFile->title = $imageName;
            $saveFile->type = '1';
            $saveFile->save();

            return response()->json(['success' => 'Crop Image Saved/Uploaded Successfully']);
        } else {
            return response()->json(['error' => 'please add image']);
        }



        //$fileupload = new MyImages();
        //$fileupload->title = $name;
        //$fileupload->save();
        //return response()->json('Successfully added');
    }

    public function imgResize(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'imgFile' => 'required|image|mimes:jpg,jpeg,png,svg,gif|max:2048',
        ]);

        $image = $request->file('imgFile');
        $input['imagename'] = time() . '.' . $image->extension();

        $filePath = public_path('/thumbnails');

        $img = Image::make($image->path());
        $img->resize(110, 110, function ($const) {
            $const->aspectRatio();
        })->save($filePath . '/' . $input['imagename']);

        $filePath = public_path('/images');
        $image->move($filePath, $input['imagename']);

        return back()
            ->with('success', 'Image uploaded')
            ->with('fileName', $input['imagename']);
    }








    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
