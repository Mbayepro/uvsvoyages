<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

Les formulaires sont enregistrés dans Supabase ET redirigent vers WhatsApp. L'enregistrement Supabase doit se faire en arrière-plan (si erreur, logguée, on ne bloque pas la redirection).
