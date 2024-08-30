# Documentação do Serviço de Leitura de Consumo de Água e Gás

## Descrição

Este serviço gerencia a leitura individualizada de consumo de água e gás. Utiliza IA para obter a medição através da foto de um medidor. O serviço possui os seguintes endpoints:

1. **POST /upload**: Recebe uma imagem em base64, consulta o Gemini e retorna a medida lida pela API.
2. **PATCH /confirm**: Confirma ou corrige o valor lido pelo LLM.
3. **GET /<customer_code>/list**: Lista as medidas realizadas por um cliente.

## Configuração

- **Docker:** Certifique-se de que o Docker está instalado e em execução. O projeto utiliza Docker para containerização. Se ainda não tiver o Docker instalado, siga as instruções em [docker.com](https://docs.docker.com/get-docker/).

1. **Clone o repositório:**

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie a aplicação:**

   ```bash
   npm start
   ```

## Endpoints

### 1. POST /upload

**Descrição:** Recebe uma imagem de um medidor e retorna seu valor.

**Request Body:**

```json
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" "ou" "GAS"
}
```

**Response Body:**

```json
{
  "image_url": "string",
  "measure_value": "integer",
  "measure_uuid": "string"
}
```

### 2. PATCH /confirm

**Descrição:** Confirma ou corrige o valor lido.

**Request Body:**

```json
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

**Response Body:**

```json
{
  "success": true
}
```

### 3. GET /<customer_code>/list

**Descrição:** Lista as medidas realizadas por um cliente.

**Query Parameters:**measure_type (opcional): "WATER" ou "GAS" (case insensitive)

**Response Body:**

```json
{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": "boolean",
      "image_url": "string"
    }
  ]
}
```
