IMAGE_NAME="nome-da-imagem"
TAG="latest"

echo "Construindo a imagem Docker..."
docker build -t $IMAGE_NAME:$TAG .

if [ $? -eq 0 ]; then
  echo "Imagem $IMAGE_NAME:$TAG criada com sucesso!"
else
  echo "Falha ao criar a imagem."
  exit 1
fi
