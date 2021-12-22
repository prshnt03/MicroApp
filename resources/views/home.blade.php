@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>


            <div class="card mb-3">
                <div class="card-body">
                    <!-- React root DOM -->
                    <div id="mFileUploadComponent">
                    </div>

                    <!-- React JS -->
                    <script src="{{ asset('js/app.js') }}" defer></script>
                </div>
            </div>

        </div>
    </div>
</div>
@endsection