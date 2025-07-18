<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LegadalesController extends Controller
{
    //
      public function Terminos()
    {
        return Inertia::render('Legal/TerminosCondiciones');
    }
          public function Comunidad()
    {
        return Inertia::render('Legal/NormasComunidad');
    }
          public function Politica()
    {
        return Inertia::render('Legal/PoliticasPrivacidad');
    }
}
