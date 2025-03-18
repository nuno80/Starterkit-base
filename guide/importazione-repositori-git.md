## **Creazione progetto da una repository git**

Questa guida ti aiuterà a unire uno specifico branch di una specifica repository github (es. branch `typesafe-env` dal repository `w3cj/next-start`) ad una tua repository (es. `nuno80/Starterkit-base`).


## **Premessa**

## Creazione Repository GitHub
1. Accedi al tuo account GitHub
2. Clicca su "New repository"
3. Inserisci lo stesso nome utilizzato per l'app T3 (es. `nuno80/Starterkit-base`)
4. NON aggiungere README, .gitignore o license (verranno creati dal template)
5. Clicca "Create repository"  
 

1. **Inizializzazione del repository locale**:
   ```bash
   git init
   ```
   **Descrizione**: Inizializza una nuova repository Git nella directory corrente.

   ```bash
   git config --global init.defaultBranch main
   ```
   **Descrizione**: Imposta il branch predefinito su `main` per tutti i nuovi repository.

   ```bash
   git branch -m main
   ```
   **Descrizione**: Rinomina il branch corrente in `main` (se era stato creato come `master`).

2. **Aggiunta del remote `upstream`**:
   ```bash
   git remote add upstream https://github.com/w3cj/next-start.git
   ```
   **Descrizione**: Aggiunge un remote chiamato `upstream` che punta al repository `w3cj/next-start`.

3. **Fetch del branch `typesafe-env`**:
   ```bash
   git fetch upstream typesafe-env
   ```
   **Descrizione**: Scarica il branch `typesafe-env` dal remote `upstream` senza unirlo al tuo branch corrente.

4. **Merge del branch `typesafe-env`**:
   ```bash
   git merge upstream/typesafe-env --allow-unrelated-histories
   ```
   **Descrizione**: Unisce il branch `typesafe-env` nel tuo branch corrente, anche se i repository non hanno una storia comune. Un "remote" in Git è semplicemente un collegamento a un altro repository, che può essere ospitato su GitHub o su un altro servizio di hosting di codice.

Nel tuo caso, vuoi collegarti al repository w3cj/next-start per poter accedere al suo contenuto (in particolare al branch typesafe-env).
upstream: è il nome che hai scelto per questo remote. Puoi usare qualsiasi nome, ma upstream è comune per indicare il repository originale da cui stai prendendo il codice.

5. **Aggiungi il remote `origin`**:
   Collega il tuo repository locale al repository remoto su GitHub:
   ```bash
   git remote add origin https://github.com/nuno80/Starterkit-base.git
   ```
   **Descrizione**: Aggiunge un remote chiamato `origin` che punta al tuo repository su GitHub.

6. **Verifica i remote**:
   Controlla che il remote `origin` sia stato aggiunto correttamente:
   ```bash
   git remote -v
   ```
   **Descrizione**: Mostra tutti i remote configurati con i rispettivi URL.

   Dovresti vedere un output simile a questo:
   ```
   origin    https://github.com/nuno80/Starterkit-base.git (fetch)
   origin    https://github.com/nuno80/Starterkit-base.git (push)
   upstream  https://github.com/w3cj/next-start.git (fetch)
   upstream  https://github.com/w3cj/next-start.git (push)
   ```

7. **Esegui il push delle modifiche**:
   Dopo aver configurato il remote `origin`, puoi fare il push delle modifiche:
   ```bash
   git push origin main
   ```
   **Descrizione**: Carica le modifiche dal tuo branch locale `main` al repository remoto `origin`.

---

## **Passaggi facoltativi**

### 1. **Risoluzione dei conflitti**
Se durante il merge si verificano conflitti, risolvili manualmente nei file indicati da Git. Poi aggiungi i file risolti e conferma il merge:
   ```bash
   git add <file-conflitto>
   ```
   **Descrizione**: Aggiunge il file con conflitti risolti all'area di staging.

   ```bash
   git commit -m "Risolti conflitti dopo il merge"
   ```
   **Descrizione**: Conferma le modifiche con un messaggio di commit.

### 2. **Rimozione del remote `upstream`**
Se non hai più bisogno del remote `upstream`, puoi rimuoverlo:
   ```bash
   git remote remove upstream
   ```
   **Descrizione**: Rimuove il remote `upstream` dalla configurazione del repository.

---

