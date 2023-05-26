# Testes automatizados com cypress
Segue as funcionalidades e os casos de teste executados com `cypress` e `mocha`:

| Funcionalidade          | Descrição do Caso de Teste                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| Login                   |                                                                                                             |
| Successful Login        |                                                                                                             |
|                         | Testa o login com um nome de usuário válido e senha                                                          |
|                         | Testa o login com um email válido e senha válida                                                            |
| Failed Login            |                                                                                                             |
|                         | Testa o login com um nome de usuário ou email inválido                                                       |
|                         | Testa o login com uma senha incorreta                                                                        |
|                         | Testa o login com o campo de nome de usuário ou email vazio                                                  |
|                         | Testa o login com o campo de senha vazio                                                                     |
| Route Generation        |                                                                                                             |
| Success Route           |                                                                                                             |
|                         | Gera uma rota com coordenadas de início e destino válidas                                                    |
| Failure Route           |                                                                                                             |
|                         | Exibe uma mensagem de erro para coordenadas de início inválidas                                              |
|                         | Exibe uma mensagem de erro para coordenadas de destino inválidas                                             |
|                         | Exibe uma mensagem de erro para campos de início e destino não especificados                                 |
| Logout                  |                                                                                                             |
|                         | Testa o logout após o login ser feito com sucesso                                                            |
| API Location Search     |                                                                                                             |
|                         | Retorna resultados para uma entrada de texto válida                                                          |
|                         | Retorna resultados para uma entrada de texto válida                                                          |
|                         | Não retorna resultados para entradas de texto inválidas                                                      |
|                         | Lida com entradas ausentes de forma adequada                                                                 |
