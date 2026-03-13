
$ dotnet new webapi -n <project_name> -o <output_dir> --domain <domain_name> --use-controllers

$ dotnet new webapi -n <project_name> -o <output_dir> --domain <domain_name> --use-controllers --auth SingleOrg

$ openapi-generator-cli generate -i backend/src/documentation/openapi.json -g aspnetcore -o backend_aspnetmodels --additional-properties=useNewtonsoft=false
