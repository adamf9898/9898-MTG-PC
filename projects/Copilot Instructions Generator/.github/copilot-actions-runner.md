# 9898-MTG-Generators Copilot Actions Runner

We recommend configuring the runner under `\actions-runner`. This will help avoid issues related to service identity folder permissions and long path restrictions on Windows.

## Create a folder under the drive root

```powershell
mkdir actions-runner
cd actions-runner
```

## Download the latest runner package

```powershell
Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.330.0/actions-runner-win-x64-2.330.0.zip -OutFile actions-runner-win-x64-2.330.0.zip
```

## Optional: Validate the hash

```powershell
if ((Get-FileHash -Path actions-runner-win-x64-2.330.0.zip -Algorithm SHA256).Hash.ToUpper() -ne 'a7469e7f2949657327fdd75688fd8858e1352202847d024d68b93de033990779'.ToUpper()) {
	throw 'Computed checksum did not match'
}
```

## Extract the installer

```powershell
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD/actions-runner-win-x64-2.330.0.zip", "$PWD")
```

## Configure

Create the runner and start the configuration experience:

```powershell
./config.cmd --url https://github.com/adamf9898/9898-MTG --token <TOKEN>
```

## Run it!

```powershell
./run.cmd
```

---

## Using your self-hosted runner

Use this YAML in your workflow file for each job:

```yaml
runs-on: self-hosted
```

For additional details about configuring, running, or shutting down the runner, please check out our [product docs](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners).
