FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ApiShop.WebApi/ApiShop.WebApi.csproj", "ApiShop.WebApi/"]
COPY ["ApiShop.Business/ApiShop.Business.csproj", "ApiShop.Business/"]
COPY ["ApiShop.Common/ApiShop.Common.csproj", "ApiShop.Common/"]
COPY ["ApiShop.DataAccess/ApiShop.DataAccess.csproj", "ApiShop.DataAccess/"]
RUN dotnet restore "ApiShop.WebApi/ApiShop.WebApi.csproj"
COPY . .
WORKDIR "/src/ApiShop.WebApi"
RUN dotnet build "./ApiShop.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ApiShop.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiShop.WebApi.dll"]
